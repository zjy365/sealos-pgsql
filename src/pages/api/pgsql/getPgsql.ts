import { pgsqlMeta } from '@/mock/pgsql';
import { BadAuthResp, JsonResp } from '@/pages/api/response';
import { authSession } from '@/services/backend/auth';
import { CRDMeta, GetCRD, GetUserDefaultNameSpace, K8sApi } from '@/services/backend/kubernetes';
import * as k8s from '@kubernetes/client-node';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pgsqlName } = req.body;
  const kubeconfig = await authSession(req.headers);
  const kc = K8sApi(kubeconfig);
  const kube_user = kc.getCurrentUser();

  if (kube_user === null) {
    return BadAuthResp(res);
  }

  const meta: CRDMeta = {
    ...pgsqlMeta,
    namespace: GetUserDefaultNameSpace(kube_user.name)
  };

  try {
    const infraDesc = await GetCRD(kc, meta, pgsqlName);
    JsonResp(infraDesc.body, res);
  } catch (err) {
    if (err instanceof k8s.HttpError) {
      console.log(err.body.message);
    }
    JsonResp(err, res);
  }
}

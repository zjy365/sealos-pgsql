import { BadAuthResp, JsonResp } from '@/pages/api/response';
import { CRDMeta, GetUserDefaultNameSpace, K8sApi, ListCRD } from '@/services/backend/kubernetes';
import * as k8s from '@kubernetes/client-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { pgsqlMeta } from '@/mock/pgsql';
import { authSession } from '@/services/backend/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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

    const listCrd = await ListCRD(kc, meta);
    JsonResp(listCrd.body, res);
  } catch (err) {
    if (err instanceof k8s.HttpError) {
      console.log(err.body.message);
    }
    JsonResp(err, res);
  }
}

import { BadAuthResp, JsonResp } from '@/pages/api/response';
import { authSession } from '@/services/backend/auth';
import {
  GetSecret,
  GetService,
  GetUserDefaultNameSpace,
  K8sApi
} from '@/services/backend/kubernetes';
import * as k8s from '@kubernetes/client-node';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pgsqlName, users } = req.body;
  const kubeconfig = await authSession(req.headers);
  const kc = K8sApi(kubeconfig);
  const kube_user = kc.getCurrentUser();

  if (kube_user === null) {
    return BadAuthResp(res);
  }

  const namespace = GetUserDefaultNameSpace(kube_user.name);
  try {
    const serviceResult = await GetService(kc, pgsqlName, namespace);
    const secretResult = [];
    if (users) {
      for (const name of users) {
        const res = await GetSecret(
          kc,
          `${name}.${pgsqlName}.credentials.postgresql.acid.zalan.do`,
          namespace
        );
        secretResult.push(res.body);
      }
    }
    JsonResp({ serviceResult, secretResult }, res);
  } catch (err) {
    if (err instanceof k8s.HttpError) {
      console.log(err.body.message);
    }
    JsonResp(err, res);
  }
}

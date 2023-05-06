import Pgsql from '@/applications/pgsql';
import useSessionStore from '@/stores/session';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { createSealosApp, sealosApp } from 'sealos-desktop-sdk/app';
// const Pgsql = dynamic(() => import('@/applications/pgsql/index'), {
//   ssr: false
// });
import styles from './index.module.scss';

export default function Index() {
  const { setSession, isUserLogin } = useSessionStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return createSealosApp();
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        const result = await sealosApp.getSession();
        console.log(result);
        setSession(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    initApp();
  }, [setSession]);

  if (isLoading && process.env.NODE_ENV !== 'development') {
    return <div className={clsx(styles.loading, styles.err)}>loading</div>;
  }

  return <Pgsql />;
}

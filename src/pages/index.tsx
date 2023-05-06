import Pgsql from '@/applications/pgsql';
import useSessionStore from '@/stores/session';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { createSealosApp, sealosApp } from 'sealos-desktop-sdk/app';
// const Pgsql = dynamic(() => import('@/applications/pgsql/index'), {
//   ssr: false
// });

export default function Index() {
  const { setSession, isUserLogin } = useSessionStore();
  const [url, setUrl] = useState('');
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
      } catch (error) {}
    };
    initApp();
  }, [setSession]);

  return <Pgsql />;
}

import Pgsql from '@/pages/pgsql/index';
import useSessionStore from '@/stores/session';
import { useState, useEffect } from 'react';
import { createSealosApp, sealosApp } from 'sealos-desktop-sdk/app';

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

  return <div>saas</div>;
}

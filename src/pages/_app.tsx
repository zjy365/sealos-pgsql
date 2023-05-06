import '../styles/globals.scss';
import { FluentProvider, Theme, webLightTheme } from '@fluentui/react-components';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0
    }
  }
});

const customLightTheme: Theme = {
  ...webLightTheme,
  colorPaletteRedBorder2: '#ee4161'
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FluentProvider theme={customLightTheme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </FluentProvider>
  );
}

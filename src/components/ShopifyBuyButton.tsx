'use client';

import { useEffect, useRef } from 'react';

type ShopifyUIInstance = {
  createComponent: (
    type: 'product',
    options: {
      id: string | number;
      node: HTMLElement;
      moneyFormat?: string;
      options?: Record<string, unknown>;
    }
  ) => void;
};

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: {
        domain: string;
        storefrontAccessToken: string;
      }) => unknown;
      UI: {
        onReady: (client: unknown) => Promise<ShopifyUIInstance>;
      };
    };
  }
}

export default function ShopifyBuyButton() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasRenderedRef = useRef(false); // per-mount lock

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // prevent double execution within same mount
    if (hasRenderedRef.current) return;
    hasRenderedRef.current = true;

    const scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    const loadScript = (): Promise<void> => {
      return new Promise((resolve) => {
        if (window.ShopifyBuy?.UI) {
          resolve();
          return;
        }

        const existing = document.querySelector(
          `script[src="${scriptURL}"]`
        ) as HTMLScriptElement | null;

        if (existing) {
          existing.addEventListener('load', () => resolve());
          return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const init = async () => {
      await loadScript();
      if (!window.ShopifyBuy) return;

      const client = window.ShopifyBuy.buildClient({
        domain: 'e9aba8-v7.myshopify.com',
        storefrontAccessToken: '608fb3cd6e761e9974b3d1d190b24fb8',
      });

      const ui = await window.ShopifyBuy.UI.onReady(client);

      // ensure clean mount
      container.innerHTML = '';

      ui.createComponent('product', {
        id: '10089180135714',
        node: container!,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          product: {
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  maxWidth: 'calc(25% - 20px)',
                  marginLeft: '20px',
                  marginBottom: '50px',
                },
              },
              button: {
                fontSize: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
                ':hover': {
                  backgroundColor: '#872322',
                },
                backgroundColor: '#962726',
                ':focus': {
                  backgroundColor: '#872322',
                },
              },
              quantityInput: {
                fontSize: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
              },
            },
            text: {
              button: 'Add to cart',
            },
          },
          productSet: {
            styles: {
              products: {
                '@media (min-width: 601px)': {
                  marginLeft: '-20px',
                },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  maxWidth: '100%',
                  marginLeft: '0px',
                  marginBottom: '0px',
                },
              },
              button: {
                fontSize: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
                ':hover': {
                  backgroundColor: '#872322',
                },
                backgroundColor: '#962726',
                ':focus': {
                  backgroundColor: '#872322',
                },
              },
              quantityInput: {
                fontSize: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
              },
            },
            text: {
              button: 'Add to cart',
            },
          },
          option: {},
          cart: {
            styles: {
              button: {
                fontSize: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
                ':hover': {
                  backgroundColor: '#872322',
                },
                backgroundColor: '#962726',
                ':focus': {
                  backgroundColor: '#872322',
                },
              },
            },
            text: {
              total: 'Subtotal',
              button: 'Checkout',
            },
          },
          toggle: {
            styles: {
              toggle: {
                backgroundColor: '#962726',
                ':hover': {
                  backgroundColor: '#872322',
                },
                ':focus': {
                  backgroundColor: '#872322',
                },
              },
              count: {
                fontSize: '16px',
              },
            },
          },
        },
      });
    };

    init();

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="my-8" />;
}
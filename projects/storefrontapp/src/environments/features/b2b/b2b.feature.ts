import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  OrganizationModule,
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/my-account/organization';
import { B2bStorefrontModule } from '@spartacus/storefront';
import { environment } from '../../environment';
import { FeatureEnvironment } from '../../models/feature.model';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    B2bStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          prefix: environment.occApiPrefix,
          endpoints: {
            addEntries: 'orgUsers/${userId}/carts/${cartId}/entries',
            user: 'orgUsers/${userId}',
          },
        },
      },
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
      },

      // custom routing configuration for e2e testing
      routing: {
        routes: {
          product: {
            paths: ['product/:productCode/:name', 'product/:productCode'],
          },
        },
      },
      // we bring in static translations to be up and running soon right away
      i18n: {
        resources: {
          en: { ...translations.en, ...organizationTranslations.en },
        },
        chunks: {
          ...translationChunksConfig,
          ...organizationTranslationChunksConfig,
        },

        fallbackLang: 'en',
      },

      features: {
        level: '2.0',
      },
    }),

    OrganizationModule,
  ],
};

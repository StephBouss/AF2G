import { test, expect } from '@playwright/test';

test.describe('Navigation globale', () => {
  const routes = [
    { path: '/a-propos', name: 'A propos' },
    { path: '/actions', name: 'Actions' },
    { path: '/adhesion', name: 'Adhésion' },
    { path: '/bureau', name: 'Bureau' },
    { path: '/congres', name: 'Congrès' },
    { path: '/contact', name: 'Contact' },
    { path: '/galerie', name: 'Galerie' },
    { path: '/partenariats', name: 'Partenariats' },
  ];

  for (const route of routes) {
    test(`La page ${route.name} charge sans erreur`, async ({ page }) => {
      // Intercepter les erreurs console (optionnel, mais utile pour détecter les pages cassées)
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));

      const response = await page.goto(route.path);
      
      // On s'assure que le code de statut HTTP est correct (ex: 200)
      expect(response?.status()).toBeLessThan(400);

      // On s'assure qu'il y a un titre principal h1 sur la page
      const heading = page.getByRole('heading', { level: 1 }).first();
      await expect(heading).toBeVisible();

      // Vérifier qu'il n'y a pas d'erreurs javascript fatales
      expect(errors).toHaveLength(0);
    });
  }
});

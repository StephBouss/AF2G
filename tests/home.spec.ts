import { test, expect } from '@playwright/test';

test.describe("Page d'Accueil", () => {
  test('affiche correctement le titre et les éléments principaux', async ({ page }) => {
    await page.goto('/');

    // Vérification du titre de la page
    await expect(page).toHaveTitle(/AF2G/i);

    // Vérification de la présence des boutons d'appel à l'action dans le hero
    const btnRejoindre = page.getByRole('link', { name: /Rejoindre l'association/i });
    await expect(btnRejoindre).toBeVisible();

    const btnContact = page.getByRole('link', { name: /Nous contacter/i });
    await expect(btnContact).toBeVisible();
    
    // Vérifier la présence du titre de section "Qui sommes-nous ?"
    const h2QuiSommesNous = page.getByRole('heading', { name: /Qui sommes-nous \?/i });
    await expect(h2QuiSommesNous).toBeVisible();
  });

  test('bouton Inscription au Congrès redirige correctement', async ({ page }) => {
    await page.goto('/');

    // Clic sur le bouton d'inscription au congrès
    const btnCongres = page.getByRole('link', { name: /S'inscrire au Congrès/i }).first();
    await expect(btnCongres).toBeVisible();
    await btnCongres.click();

    // Vérification de l'URL
    await expect(page).toHaveURL(/.*\/congres/);
    
    // On peut aussi vérifier qu'on y trouve un titre pertinent
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

// @ts-check
const { test, expect } = require('@playwright/test');

// baseURL comes from playwright.config.js (http://localhost:8080)
const LEARNING_PATH = '/learning.html';

test.describe('Learning Page — Practice Exercises', () => {

    test('page loads with title and skill selector', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await expect(page).toHaveTitle(/Practice Exercises/);
        await expect(page.locator('.skill-selector')).toBeVisible();
        await expect(page.locator('main h1')).toContainText('Practice Exercises');
    });

    test('skill selector has three options all visible', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        const options = page.locator('.skill-selector__option');
        await expect(options).toHaveCount(3);
        for (let i = 0; i < 3; i++) {
            await expect(options.nth(i)).toBeVisible();
        }
    });

    test('skill selector options have min height 44px at desktop', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        const option = page.locator('.skill-selector__option').first();
        const box = await option.boundingBox();
        expect(box.height).toBeGreaterThanOrEqual(44);
    });

    test('skill selector options have min height 44px at 375px viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(LEARNING_PATH);
        const options = page.locator('.skill-selector__option');
        for (let i = 0; i < 3; i++) {
            const box = await options.nth(i).boundingBox();
            expect(box.height).toBeGreaterThanOrEqual(44);
        }
        // All three fit in one row (selector not wider than viewport)
        const selector = page.locator('.skill-selector');
        const selectorBox = await selector.boundingBox();
        expect(selectorBox.width).toBeLessThanOrEqual(375);
    });

    test('beginner exercises load and render as cards with spine steps', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.waitForSelector('.exercise-card', { timeout: 8000 });
        const cards = page.locator('.exercise-card');
        const count = await cards.count();
        expect(count).toBeGreaterThan(0);

        await expect(cards.first().locator('.exercise-card__title')).toBeVisible();
        await expect(cards.first().locator('.exercise-steps')).toBeVisible();

        // First step should be active
        const firstStep = cards.first().locator('.exercise-step').first();
        await expect(firstStep).toHaveAttribute('data-status', 'active');
    });

    test('clicking intermediate tab shows intermediate panel', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.waitForSelector('.exercise-card', { timeout: 8000 });

        const intermediateBtn = page.locator('.skill-selector__option[data-level="intermediate"]');
        await intermediateBtn.click();

        await expect(page.locator('.skill-selector')).toHaveAttribute('data-active', 'intermediate');
        await expect(page.locator('#panel-beginner')).toHaveAttribute('hidden', '');
        await expect(page.locator('#panel-intermediate')).not.toHaveAttribute('hidden');
    });

    test('marking a step complete advances to next step', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.waitForSelector('.exercise-card', { timeout: 8000 });

        const firstCard = page.locator('.exercise-card').first();
        const firstStep = firstCard.locator('.exercise-step').first();
        const doneBtn = firstStep.locator('.exercise-step__done');

        await expect(doneBtn).toBeVisible();
        await doneBtn.click();

        await expect(firstStep).toHaveAttribute('data-status', 'complete');
        const secondStep = firstCard.locator('.exercise-step').nth(1);
        await expect(secondStep).toHaveAttribute('data-status', 'active');
    });

    test('completing all steps shows completion message', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.waitForSelector('.exercise-card', { timeout: 8000 });

        const firstCard = page.locator('.exercise-card').first();
        const allSteps = firstCard.locator('.exercise-step');
        const stepCount = await allSteps.count();

        for (let i = 0; i < stepCount; i++) {
            const doneBtn = page.locator('.exercise-step[data-status="active"] .exercise-step__done').first();
            await doneBtn.click();
        }

        const completeEl = firstCard.locator('.exercise-complete');
        await expect(completeEl).toBeVisible();
    });

    test('inactive panels have aria-hidden="true" after JS init', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.waitForSelector('.exercise-card', { timeout: 8000 });

        await expect(page.locator('#panel-intermediate')).toHaveAttribute('aria-hidden', 'true');
        await expect(page.locator('#panel-advanced')).toHaveAttribute('aria-hidden', 'true');
    });

    test('sidebar nav includes Exercises link in learning.html', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        const exercisesLink = page.locator('.sidebar a[href="learning.html"]');
        await expect(exercisesLink).toBeVisible();
        await expect(exercisesLink).toHaveClass(/active/);
    });

    test('sidebar nav includes Exercises link in index.html', async ({ page }) => {
        await page.goto('/index.html');
        const exercisesLink = page.locator('.sidebar a[href="learning.html"]');
        await expect(exercisesLink).toBeVisible();
    });

    test('dark mode — cards and selector render visibly', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'dark');
        });
        await page.waitForSelector('.exercise-card', { timeout: 8000 });
        await expect(page.locator('.exercise-card').first()).toBeVisible();
        await expect(page.locator('.skill-selector')).toBeVisible();
    });

    test('arrow key navigation moves between level options', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.waitForSelector('.exercise-card', { timeout: 8000 });

        // ArrowRight from beginner -> intermediate
        await page.locator('.skill-selector__option[data-level="beginner"]').focus();
        await page.keyboard.press('ArrowRight');
        await expect(page.locator('.skill-selector')).toHaveAttribute('data-active', 'intermediate');

        // Re-focus the intermediate button (focus moved to exercise title after activate)
        await page.locator('.skill-selector__option[data-level="intermediate"]').focus();
        await page.keyboard.press('ArrowRight');
        await expect(page.locator('.skill-selector')).toHaveAttribute('data-active', 'advanced');

        // ArrowLeft wraps from advanced back
        await page.locator('.skill-selector__option[data-level="advanced"]').focus();
        await page.keyboard.press('ArrowLeft');
        await expect(page.locator('.skill-selector')).toHaveAttribute('data-active', 'intermediate');
    });

    test('focus moves to first exercise title when level is activated', async ({ page }) => {
        await page.goto(LEARNING_PATH);
        await page.waitForSelector('.exercise-card', { timeout: 8000 });

        await page.locator('.skill-selector__option[data-level="intermediate"]').click();
        // Wait for intermediate exercises to render
        await page.waitForSelector('#panel-intermediate .exercise-card', { timeout: 8000 });

        const focused = await page.evaluate(() => document.activeElement?.className);
        expect(focused).toContain('exercise-card__title');
    });

});

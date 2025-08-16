from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Wait for the hero section to be loaded by checking for the main heading.
        expect(page.get_by_role("heading", name="DHRUV SINGH")).to_be_visible()

        # Take a screenshot of the entire page.
        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()

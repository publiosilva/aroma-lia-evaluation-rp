# Original URL: https://github.com/OlgaAlbul/autoTestOnPython/blob/16d833239941c75f0847aa7de88ea1ad53a38aea/hw2/test_2.py#L55-L84

def test_smell_155(site, x_selector1, x_selector2, btn_selector, create_btn, post_title_input, post_description_input, post_content_input, post_save_btn, post_title_selector):
    # Click on the post creation button
    create_post_btn = site.find_element("css", create_btn)
    create_post_btn.click()
    time.sleep(testdata["wait"])

    # Enter post data
    title_input = site.find_element("xpath", post_title_input)
    title_input.send_keys(post_title)

    description_input = site.find_element("xpath", post_description_input)
    description_input.send_keys(post_description)

    content_input = site.find_element("xpath", post_content_input)
    content_input.send_keys(post_content)
    time.sleep(testdata["wait"])

    # Save the post
    wait = WebDriverWait(site.driver, 10)
    save_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, post_save_btn)))
    save_button.click()

    # Wait until the new post title becomes visible to verify that the post was saved
    saved_post_title = wait.until(
        EC.presence_of_element_located((By.XPATH, f"//h1[text()='{post_title}']"))
    )

    # Check that the new post appeared with the given name
    post_title_element = site.find_element("xpath", post_title_selector)
    assert post_title_element.text == post_title
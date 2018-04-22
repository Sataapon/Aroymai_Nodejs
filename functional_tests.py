from selenium import webdriver
import unittest
import time

class NewVisitorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_can_start_a_poll_vote_it_and_see_result(self):
        # While Pun eat "Gang curry" and "Keghuay" at new restaurant
        # She see sign Website about food survey
        # When She finish eat food, She go to check out its homepage 
        self.browser.get('http://localhost:3000')

        # She see Aroymai in title and header
        self.assertIn('Aroymai', self.browser.title)
        header_text = self.browser.find_element_by_tag_name('h1').text
        self.assertIn('Aroymai', header_text)

        # She select "Gangcurry"
        select_food = self.browser.find_element_by_id('id_Gangcurry')
        select_food.click()

        # and she select "Keghuay"
        select_drink = self.browser.find_element_by_id('id_Keghuay')
        select_drink.click()

        # When she click Agree button, the page reload,
        vote = self.browser.find_element_by_id('id_Agree')
        vote.click()
        time.sleep(1)

        # Now the new page appear
        # She see only "Gang curry" and "Keghuay" with vote button and text box
        table_info = self.browser.find_element_by_tag_name('table').text
        self.assertIn('Gangcurry', table_info)
        self.assertNotIn('Gangsom', table_info)
        self.assertIn('Keghuay', table_info)
        self.assertNotIn('Namoi', table_info)

        # She type "Very delicious" in text box and fill "5" at vote buttun of "Gangcurry"
        commentfood = self.browser.find_element_by_id('id_Gangcurry_Comment')
        self.assertEqual(
            commentfood.get_attribute('placeholder'),
            'Enter comment'
        )
        commentfood.send_keys('Very delicious')
        scorefood = self.browser.find_element_by_id('id_Gangcurry_Score')
        scorefood.send_keys('5')

        # She type "Sweet too much" in text box and fill "4" at vote button of "Keghuay" 
        commentdrinks = self.browser.find_element_by_id('id_Keghuay_Comment')
        self.assertEqual(
            commentdrinks.get_attribute('placeholder'),
            'Enter comment'
        )
        commentdrinks.send_keys('Sweet too much')
        scoredrinks = self.browser.find_element_by_id('id_Keghuay_Score')
        scoredrinks.send_keys('4')

        # When she click Send button, the page reload,
        send = self.browser.find_element_by_id('id_Send')
        send.click()
        time.sleep(1)
        
        # Now the new page appear
        # She see "Gangcurry" with text "You vote: 5 points, comment: Very delicious"
        table_result = self.browser.find_element_by_tag_name('table').text
        self.assertIn('Gangcurry', table_result)
        self.assertIn('Your vote: 5 points', table_result)
        self.assertIn('Your comment: Very delicious', table_result)

        # She see "Keghuay" with text "You vote: 4 points, comment: Sweet too much"
        self.assertIn('Keghuay', table_result)
        self.assertIn('Your vote: 4 points', table_result)
        self.assertIn('Your comment: Sweet too much', table_result) 

        # Satisfied, she paid and walked out of the restaurant
        self.fail('Finish the test!')

if __name__ == '__main__':
    unittest.main(warnings='ignore')

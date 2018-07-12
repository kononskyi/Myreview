Feature: Login to Myreview
  As a user with defined role
  I go to the Myreview main page, enter valid login, password and press login button
  So i have to be logged into the system and log out from the system

  @tag1
  Scenario Outline: Login as user with defined role
    Given Login page is opened
    When  I type "<username>" into username field
    And I type "Levi9Pro" into password field
    And Click on login button
    Then I should be logged into the system
    And Log out from the system

    Examples:
      | username |
      | eptester1|
      | epphp1   |
      |eptesterdm|
      | epphpdm  |

  @tag2
  Scenario: Check of presence login page elements
    Given Login page is opened
    Then Navbar and logo are present
    And Login panel is present
    And Username and Password placeholders are present
    And Fields icons are present
    And Login button text are present









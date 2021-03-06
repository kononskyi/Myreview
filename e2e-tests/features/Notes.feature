Feature: Add objective
  As a user(employee)
  I can click on Add objective button at the Notes page
  So new dialog window "Objective" appears

  @tag3
  Scenario: Modal window(Objective)emergence
    Given Logged as employee "epphp1" with "Levi9Pro"
    And Notes item is opened
    When User press Add objective button
    Then Objectives modal window is appeared

  @tag4
  Scenario: Add new objective
    Given Logged as employee "epphp1" with "Levi9Pro"
    And Notes item is opened
    When User press Add objective button
    And Fill title, comment with valid data and choose deadline
    And Press Save button
    Then Just saved objective appears in the list of objectives

  @tag5
  Scenario: Delete last objective from the list
    Given Logged as employee "epphp1" with "Levi9Pro"
    And Notes item is opened
    When User press delete button near the last objective
    And Confirm the selection in Delete this Objective dialog window by clicking Delete button
    Then Objective removed from the list
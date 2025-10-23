Feature: Todo List Application
  As a user
  I want to manage my todo list
  So that I can keep track of my tasks

  Scenario: Add a new todo item
    Given I am on the todo application
    When I add a todo item with text "Buy groceries"
    Then I should see "Buy groceries" in the todo list

  Scenario: Complete a todo item
    Given I am on the todo application
    And I have added a todo item "Walk the dog"
    When I mark the todo item "Walk the dog" as complete
    Then the todo item "Walk the dog" should be marked as complete

  Scenario: Delete a todo item
    Given I am on the todo application
    And I have added a todo item "Pay bills"
    When I delete the todo item "Pay bills"
    Then I should not see "Pay bills" in the todo list
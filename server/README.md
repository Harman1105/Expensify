### Authentication

POST /api/auth/signup
Creates a new user account.

POST /api/auth/login
Authenticates an existing user and returns a JWT token.

### Expenses

GET /api/expenses
Fetches the logged-in user's expenses. Supports filtering, pagination, and sorting.

POST /api/expenses
Creates a new expense.

GET /api/expenses/:id
Fetches a specific expense.

PUT /api/expenses/:id
Updates an existing expense.

DELETE /api/expenses/:id
Deletes an expense.

GET /api/expenses/category-summary
Returns spending grouped by category.

GET /api/expenses/monthly-summary
Returns spending grouped by month.

### Savings

POST /api/savings
Creates a new savings goal.

GET /api/savings
Fetches the user's savings goals.

POST /api/savings/:id/add
Adds a contribution to a savings goal.

### Analytics

GET /api/analytics
Returns spending and savings analytics, including category summaries, monthly spending, highest expense, and average expense.

### Dashboard

GET /api/dashboard
Returns the data required for the main dashboard, including:

Total spent
Total saved
Savings rate
Recent expenses
Savings goals
Spending by category
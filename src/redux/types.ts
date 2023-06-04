export interface UserState {
  username: string;
}
export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface ExpenseState {
  expenses: Expense[];
}
export interface ExpenseSection {
  title: string;
  data: Expense[];
}

export interface Filters {
  title: string;
  date: Date | null;
}

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: Expense;
}

interface DeleteExpenseAction {
  type: typeof DELETE_EXPENSE;
  payload: string; // the ID of the expense to be deleted
}

export type ExpenseActionTypes = AddExpenseAction | DeleteExpenseAction;

export class MealDbError extends Error {
  status: number;
  code: string;
  constructor(message: string, status = 500, code = "MEALDB_ERROR") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export default class OutOfStockError extends Error { 
  constructor() { 
    super()
    this.name = 'OutOfStockError';
  }
}
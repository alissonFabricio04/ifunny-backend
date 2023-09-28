export interface Controller {
  handle(request: Request | unknown): Promise<any>
}
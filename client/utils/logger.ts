
class Logger {
    private prefix: string;
  
    constructor(prefix: string = "[RoomPriceGenie]") {
      this.prefix = prefix;
    }
  
    /**
     * Gets the current timestamp in ISO format.
     * @returns The current timestamp as a string.
     */
    private getTimestamp(): string {
      return new Date().toISOString();
    }
  
    /**
     * Logs a normal message with a custom template.
     * @param message - The message to log.
     * @param data - Optional data to include in the log.
     */
    log(message: string, data?: unknown): void {
      console.log(
        `${this.prefix} [LOG] ${this.getTimestamp()} - ${message}`,
        data
      );
    }
  
    /**
     * Logs an error with a custom template.
     * @param message - The error message to log.
     * @param error - Optional error object to include.
     */
    error(message: string, error?: Error | unknown): void {
      if (error instanceof Error) {
        console.error(
          `${this.prefix} [ERROR] ${this.getTimestamp()} - ${message}`,
          error.stack
        );
      } else {
        console.error(
          `${this.prefix} [ERROR] ${this.getTimestamp()} - ${message}`,
          error
        );
      }
    }
  }
  
  export { Logger };
  
  export type ILogger = InstanceType<typeof Logger>;
  
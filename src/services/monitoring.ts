import { supabase } from '@/config/database';

interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, any>;
  timestamp: string;
}

class MonitoringService {
  private static instance: MonitoringService;
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 100;

  private constructor() {}

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  async log(level: LogEntry['level'], message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };

    this.logs.push(entry);
    
    // Keep logs array at a reasonable size
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }

    // In production, send logs to Supabase
    if (process.env.NODE_ENV === 'production') {
      try {
        await supabase.from('system_logs').insert([entry]);
      } catch (error) {
        console.error('Failed to store log in database:', error);
      }
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console[level](message, context || '');
    }
  }

  info(message: string, context?: Record<string, any>) {
    return this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    return this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>) {
    return this.log('error', message, context);
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

export const monitoring = MonitoringService.getInstance(); 
export interface MailConfig {
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user: string;
    pass: string;
  };
  logger?: boolean;
}

export type MailerConfigValues = {
  [k: string]: MailConfig & Partial<ExtraMailerConfig>;
};

export interface ExtraMailerConfig {
  from_email: string;
  from_name: string;
}

export const MailConfigValue: MailerConfigValues = {
  development: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: {
      user: process.env.MAIL_USER as string,
      pass: process.env.MAIL_PASS as string,
    },
    logger: Boolean(process.env.MAIL_LOGGER),
    from_email: process.env.MAIL_FROM_EMAIL,
    from_name: process.env.MAIL_FROM_NAME,
  },
  // Add more clients here
};

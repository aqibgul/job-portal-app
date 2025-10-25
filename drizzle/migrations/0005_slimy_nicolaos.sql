ALTER TABLE `users` ADD `confirmPassword` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `confirm_password`;
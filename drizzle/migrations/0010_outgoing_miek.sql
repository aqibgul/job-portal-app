ALTER TABLE `sessions` MODIFY COLUMN `ip_address` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `username` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD `token` varchar(512) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_token_unique` UNIQUE(`token`);
CREATE TABLE `applicants` (
	`id` int NOT NULL,
	`biography` text,
	`date_of_birth` date,
	`nationality` varchar(100),
	`martial_status` enum('single','married','divorced','widowed'),
	`gender` enum('male','female','other'),
	`education` enum('none','high_school','bachelor','master','phd','other'),
	`experience` text,
	`skills` text,
	`location` varchar(255),
	`website_url` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `applicants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employers` (
	`id` int NOT NULL,
	`name` varchar(255),
	`description` text,
	`avatar_url` text,
	`banner_url` text,
	`organization_type` varchar(100),
	`team_size` varchar(50),
	`year_founded` year,
	`website_url` varchar(255),
	`location` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `employers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`user_agent` text NOT NULL,
	`ip_address` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`expires_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`role` enum('Admin','employee','applicant') NOT NULL DEFAULT 'applicant',
	`email` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`confirmPassword` text NOT NULL,
	`phone_number` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `applicants` ADD CONSTRAINT `applicants_id_users_id_fk` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `employers` ADD CONSTRAINT `employers_id_users_id_fk` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;
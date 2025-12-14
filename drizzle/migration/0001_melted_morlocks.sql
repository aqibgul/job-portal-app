ALTER TABLE `applicants` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `applicants` MODIFY COLUMN `id` int;
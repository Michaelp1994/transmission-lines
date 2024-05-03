CREATE TABLE `conductor_layers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`numFibres` integer,
	`diameterFibre` real,
	`materialTypeId` integer NOT NULL,
	`conductorTypeId` integer NOT NULL,
	FOREIGN KEY (`materialTypeId`) REFERENCES `conductor_materials`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`conductorTypeId`) REFERENCES `conductor_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `conductor_locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`x` real NOT NULL,
	`y` real NOT NULL,
	`tower_geometry_id` text NOT NULL,
	FOREIGN KEY (`tower_geometry_id`) REFERENCES `tower_geometries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `conductor_materials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`relative_permeability` real,
	`relative_permittivity` real
);
--> statement-breakpoint
CREATE TABLE `conductor_types` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`surface_area` real,
	`stranding` text,
	`outer_diameter` real NOT NULL,
	`core_diameter` real,
	`layers` real,
	`current_capacity` real,
	`dc_resistance_25` real,
	`ac_resistance_25` real,
	`ac_resistance_50` real,
	`ac_resistance_75` real NOT NULL,
	`gmr` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phases` integer NOT NULL,
	`voltage` integer NOT NULL,
	`x1r1` real NOT NULL,
	`x0r0` real NOT NULL,
	`isc3` integer NOT NULL,
	`isc1` integer NOT NULL,
	`resistance` real NOT NULL,
	`frequency` integer NOT NULL,
	`enabled` integer NOT NULL,
	`project_id` text NOT NULL,
	`x` real DEFAULT 0 NOT NULL,
	`y` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tower_geometries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transmission_conductors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`from_phase` integer NOT NULL,
	`to_phase` integer NOT NULL,
	`bundle_number` integer NOT NULL,
	`bundle_spacing` integer NOT NULL,
	`isNeutral` integer NOT NULL,
	`type_id` text NOT NULL,
	`transmission_line_id` text NOT NULL,
	FOREIGN KEY (`type_id`) REFERENCES `conductor_types`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transmission_line_id`) REFERENCES `transmission_lines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transmission_lines` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`project_id` text NOT NULL,
	`from_source_id` text NOT NULL,
	`to_source_id` text,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`from_source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`to_source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transmission_towers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`resistance` integer NOT NULL,
	`distance` integer NOT NULL,
	`geometryId` text NOT NULL,
	`transmission_line_id` text NOT NULL,
	FOREIGN KEY (`geometryId`) REFERENCES `tower_geometries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transmission_line_id`) REFERENCES `transmission_lines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_name_unique` ON `projects` (`name`);
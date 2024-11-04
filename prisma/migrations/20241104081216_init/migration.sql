/*
  Warnings:

  - You are about to drop the column `end_time` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `date` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "items_list" TEXT NOT NULL,
    "people_cont" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "start_time" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_reservations" ("created_at", "id", "items_list", "people_cont", "start_time", "updated_at", "user_id") SELECT "created_at", "id", "items_list", "people_cont", "start_time", "updated_at", "user_id" FROM "reservations";
DROP TABLE "reservations";
ALTER TABLE "new_reservations" RENAME TO "reservations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

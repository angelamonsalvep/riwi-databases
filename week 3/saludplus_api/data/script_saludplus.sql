CREATE TABLE IF NOT EXISTS "appointment" (
	"appointment_id" SERIAL NOT NULL UNIQUE,
	"appointment_date" DATE NOT NULL,
	"patient_id" INTEGER NOT NULL,
	"doctor_id" INTEGER NOT NULL,
	"treatment_code" VARCHAR(10) NOT NULL,
	"amout_paid" DECIMAL NOT NULL,
	"appointment_code" VARCHAR(20) NOT NULL UNIQUE,
	PRIMARY KEY("appointment_id")
);




CREATE TABLE IF NOT EXISTS "patient" (
	"patient_id" SERIAL NOT NULL UNIQUE,
	"patient_name" VARCHAR(100) NOT NULL,
	"patient_email" VARCHAR(100) NOT NULL UNIQUE,
	"patient_phone" VARCHAR(20) NOT NULL,
	"patient_address" VARCHAR(255) NOT NULL,
	"insurance_id" INTEGER NOT NULL,
	PRIMARY KEY("patient_id")
);




CREATE TABLE IF NOT EXISTS "doctor" (
	"doctor_id" SERIAL NOT NULL UNIQUE,
	"doctor_name" VARCHAR(100) NOT NULL,
	"doctor_email" VARCHAR(100) NOT NULL UNIQUE,
	"specialty_id" INTEGER NOT NULL,
	PRIMARY KEY("doctor_id")
);




CREATE TABLE IF NOT EXISTS "specialty" (
	"specialty_id" SERIAL NOT NULL UNIQUE,
	"specialty_name" VARCHAR(100) NOT NULL UNIQUE,
	PRIMARY KEY("specialty_id")
);




CREATE TABLE IF NOT EXISTS "treatment" (
	"treatment_code" VARCHAR(10) NOT NULL UNIQUE,
	"treatment_name" VARCHAR(50) NOT NULL,
	"treatment_cost" DECIMAL NOT NULL,
	PRIMARY KEY("treatment_code")
);




CREATE TABLE IF NOT EXISTS "insurance_provider" (
	"insurance_id" SERIAL NOT NULL UNIQUE,
	"insurance_name" VARCHAR(100) NOT NULL UNIQUE,
	"coverage_percentage" INTEGER NOT NULL,
	PRIMARY KEY("insurance_id")
);



ALTER TABLE "patient"
ADD FOREIGN KEY("insurance_id") REFERENCES "insurance_provider"("insurance_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "appointment"
ADD FOREIGN KEY("patient_id") REFERENCES "patient"("patient_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "appointment"
ADD FOREIGN KEY("doctor_id") REFERENCES "doctor"("doctor_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "appointment"
ADD FOREIGN KEY("treatment_code") REFERENCES "treatment"("treatment_code")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "doctor"
ADD FOREIGN KEY("specialty_id") REFERENCES "specialty"("specialty_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
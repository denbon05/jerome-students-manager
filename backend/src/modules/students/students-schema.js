const { z } = require("zod");

const nonEmptyString = z.string().trim().min(1, "Required");
const optionalString = z.string().trim().optional().transform((v) => (v && v.length ? v : undefined));

const baseStudentShape = {
  name: nonEmptyString,
  gender: optionalString,
  dob: optionalString,
  phone: optionalString,
  email: nonEmptyString.email("Invalid email"),
  class: nonEmptyString,
  section: optionalString,
  roll: z.union([z.string(), z.number()]).transform((v) => (v === "" || v === undefined ? undefined : Number(v))).refine((v) => v === undefined || Number.isInteger(v), "Roll must be an integer"),
  admissionDate: nonEmptyString,
  fatherName: optionalString,
  fatherPhone: optionalString,
  motherName: optionalString,
  motherPhone: optionalString,
  guardianName: nonEmptyString,
  guardianPhone: nonEmptyString,
  relationOfGuardian: nonEmptyString,
  currentAddress: nonEmptyString,
  permanentAddress: nonEmptyString,
  systemAccess: z.union([z.boolean(), z.string()]).optional().transform((v) => {
    if (typeof v === "boolean") return v;
    if (typeof v === "string") {
      const s = v.toLowerCase();
      if (["true", "1", "yes"].includes(s)) return true;
      if (["false", "0", "no"].includes(s)) return false;
    }
    return;
  }),
};

const CreateStudentSchema = z.object({ body: z.object(baseStudentShape) });

const UpdateStudentSchema = z.object({
  body: z.object({
    ...baseStudentShape,
  }).partial(),
  params: z.object({ id: z.string().min(1) })
});

const ReviewStudentStatusSchema = z.object({
  body: z.object({ status: z.union([z.boolean(), z.string()]).transform((v) => {
    if (typeof v === "boolean") return v;
    const s = String(v).toLowerCase();
    return ["true", "1", "yes"].includes(s);
  }) }),
  params: z.object({ id: z.string().min(1) })
});

const GetStudentsQuerySchema = z.object({
  query: z.object({
    name: z.string().optional(),
    class: z.string().optional(),
    section: z.string().optional(),
    roll: z.union([z.string(), z.number()]).optional(),
  })
});

module.exports = {
  CreateStudentSchema,
  UpdateStudentSchema,
  ReviewStudentStatusSchema,
  GetStudentsQuerySchema,
};



import { ObjectSchema } from 'yup';


export const validatePayload = async <T>(schema: ObjectSchema<any>, payload: T) => {
  try {
    const validate = await schema.validate(payload, { strict: true });
    return { status: true, data: validate }
  } catch (error) { 
    return { status: false, error: error.message }
  }
}
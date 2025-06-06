import bcrypt from 'bcrypt';
import db from '../../db.js'

const SALT_ROUNDS = 10;

async function registerUser({ name, email, password }) {
  console.log('Registering user SERVICE:', { name, email });
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const [user] = await db('users')
    .insert({ name, email, password: hashedPassword })
    .returning(['id', 'name', 'email']);
  return user;
}

async function loginUser({ email, password }) {
  const user = await db('users').where({ email }).first();
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

export { registerUser, loginUser };
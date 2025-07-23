using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Pokemon.Core.Helpers
{
    public static class PasswordHelper
    {
        public static (byte[], byte[]) CreatePasswordHash(string password)
        {
            using var hmac = new HMACSHA512();
            return (hmac.Key, hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        public static bool VerifyPasswordHash(string password, byte[] storedSalt, byte[] storedHash)
        {
            //if (storedHash.Length != 64) throw new Exception("Invalid length of password hash (64 bytes expected).");
            //if (storedSalt.Length != 128) throw new Exception("Invalid length of password salt (128 bytes expected).");

            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return !computedHash.Where((t, i) => t != storedHash[i]).Any();
        }
    }
}

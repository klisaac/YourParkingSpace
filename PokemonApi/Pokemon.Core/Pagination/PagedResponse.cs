using System.Collections.Generic;

namespace Pokemon.Core.Pagination
{
    public class PagedResponse<T>
    {
        public int TotalResults { get; set; }
        public int? TotalCustomResults { get; set; }
        public IEnumerable<T> Results { get; set; }
    }
}

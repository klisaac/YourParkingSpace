#nullable enable
namespace Pokemon.Core.Pagination
{
    public class LoadOptions
    {
        public PagingOptions? Paging { get; set; }
        public string? SortBy { get; set; }
        public string? SortOrder { get; set; }
    }
}

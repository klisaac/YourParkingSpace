using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Pokemon.Core.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        IList<Expression<Func<T, object>>> Includes { get; }
        IList<string> IncludeStrings { get; }
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDescending { get; }
        bool IsDeleted { get; }
        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }
    }
}

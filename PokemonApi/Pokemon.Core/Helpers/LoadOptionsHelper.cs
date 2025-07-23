#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Pokemon.Core.Pagination;

namespace Pokemon.Core.Helpers
{
    public class LoadOptionsHelper<T> where T : class
    {
        private const int DefaultPageSize = 20;

        public IEnumerable<T> ProcessLoadOptions(LoadOptions? loadOptions, IEnumerable<T> entities)
        {
            var queryableEntities = entities.AsQueryable();

            queryableEntities = PaginateEntities(loadOptions, queryableEntities);

            entities = queryableEntities.Cast<T>();
            return entities;
        }

        public IQueryable<T> PaginateEntities(LoadOptions? loadOptions, IQueryable<T> queryableEntities)
        {
            //Temp fix to disable pagination by default
            if (loadOptions?.Paging == null || loadOptions.Paging != null && loadOptions.Paging.PageSize == 0)
                return queryableEntities;

            var pageSize = loadOptions.Paging?.PageSize ?? DefaultPageSize;
            //Check to send all records at once
            //if (pageSize == 0)
            //    return queryableEntities;

            var page = loadOptions.Paging?.Page ?? 1;
            queryableEntities = queryableEntities.Skip(pageSize * (page - 1))
                .Take(pageSize);
            return queryableEntities;
        }

        public IQueryable<T> SortEntities(LoadOptions? loadOptions, IQueryable<T> queryableEntities)
        {
            if (!string.IsNullOrEmpty(loadOptions?.SortBy))
            {
                //queryableEntities = queryableEntities.OrderBy($"{loadOptions.SortBy} {loadOptions.SortOrder}");
            }

            return queryableEntities;
        }

        public Expression<Func<T, bool>> GetActiveOnlyExpression()
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var member = Expression.Property(parameter, "IsActive");

            var constant = Expression.Constant(Convert.ChangeType("true", typeof(bool)));
            var body = Expression.Equal(member, constant);

            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }



    }
}

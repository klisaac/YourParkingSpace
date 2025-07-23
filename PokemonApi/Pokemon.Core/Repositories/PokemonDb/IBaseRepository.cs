#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Pokemon.Core.Entities.PokemonDb;
using Pokemon.Core.Specifications;

namespace Pokemon.Core.Repositories.PokemonDb
{
    public interface IBaseRepository
    {
        IQueryable<T> GetById<T>(int id) where T : BaseEntity;
        Task<T?> GetSingleAsync<T>(ISpecification<T?> spec) where T : BaseEntity;
        IQueryable<T> GetAll<T>() where T : BaseEntity;
        IQueryable<T> GetAll<T>(Expression<Func<T, bool>> predicate) where T : BaseEntity;
        IQueryable<T> GetAll<T>(ISpecification<T> spec) where T : BaseEntity;
        IQueryable<T> GetAllByIncluding<T>(params Expression<Func<T, object>>[] includeProperties) where T : BaseEntity;
        IQueryable<T> GetAllByIncludingString<T>(Expression<Func<T, bool>>? predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, string? includeString = null) where T : BaseEntity;
        Task<int> CountAsync<T>(ISpecification<T> spec) where T : BaseEntity;
        Task<IEnumerable<T>> AddRangeAsync<T>(IEnumerable<T> entities) where T : BaseEntity;
        Task<T> AddAsync<T>(T entity) where T : BaseEntity;
        Task<T> AddByLoadingReferenceAsync<T>(T entity, params Expression<Func<T, object>>[] loadProperties) where T : BaseEntity;
        Task<T> AddByLoadingCollectionAsync<T>(T entity, params Expression<Func<T, IEnumerable<object>>>[] loadProperties) where T : BaseEntity;
        Task<T> UpdateAsync<T>(T entity) where T : BaseEntity;
        Task<T> UpdateByLoadingReferenceAsync<T>(T entity, params Expression<Func<T, object>>[] loadProperties) where T : BaseEntity;
        Task DeleteAsync<T>(T entity) where T : BaseEntity;
        Task BeginTransaction();
        Task CompleteTransaction();
        Task RollbackTransaction();
    }
}

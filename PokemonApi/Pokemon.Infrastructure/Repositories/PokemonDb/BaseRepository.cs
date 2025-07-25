using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Pokemon.Core.Entities.PokemonDb;
using Pokemon.Core.Repositories.PokemonDb;
using Pokemon.Core.Specifications;
using Pokemon.Infrastructure.Data;

namespace Pokemon.Infrastructure.Repositories.PokemonDb
{
    public class BaseRepository(PokemonDbContext pokemonDbContext) : IBaseRepository
    {
        public IQueryable<T> GetById<T>(int id) where T : BaseEntity
        {
            return pokemonDbContext.Set<T>().AsNoTracking().Where(x => x.Id == id);
        }
        public async Task<T?> GetSingleAsync<T>(ISpecification<T?> spec) where T : BaseEntity
        {
            return await ApplySpecification(spec).SingleOrDefaultAsync();
        }
        public IQueryable<T> GetAll<T>() where T : BaseEntity
        {
            return pokemonDbContext.Set<T>().AsNoTracking();
        }
        public IQueryable<T> GetAll<T>(Expression<Func<T, bool>> predicate) where T : BaseEntity
        {
            return pokemonDbContext.Set<T>().AsNoTracking().Where(predicate);
        }

        public IQueryable<T> GetAll<T>(ISpecification<T> spec) where T : BaseEntity
        {
            return ApplySpecification(spec);
        }
        public IQueryable<T> GetAllByIncluding<T>(params Expression<Func<T, object>>[] includeProperties) where T : BaseEntity
        {
            var queryable = pokemonDbContext.Set<T>().AsNoTracking();

            return includeProperties.Aggregate(queryable, (current, includeProperty) => current.Include(includeProperty));
        }

        public IQueryable<T> GetAllByIncludingString<T>(Expression<Func<T, bool>>? predicate = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, string? includeString = null) where T : BaseEntity
        {
            var queryable = pokemonDbContext.Set<T>().AsNoTracking();

            if (!string.IsNullOrWhiteSpace(includeString)) queryable = queryable.Include(includeString);

            if (predicate != null) queryable = queryable.Where(predicate);

            return orderBy != null ? orderBy(queryable) : queryable;
        }

        public async Task<int> CountAsync<T>(ISpecification<T> spec) where T : BaseEntity
        {
            return await ApplySpecification(spec).CountAsync();
        }
        public async Task<IEnumerable<T>> AddRangeAsync<T>(IEnumerable<T> entities) where T : BaseEntity
        {
            var array = entities as T[] ?? entities.ToArray();
            await pokemonDbContext.Set<T>().AddRangeAsync(array);
            await pokemonDbContext.SaveChangesAsync();
            return array;
        }

        public async Task<T> AddAsync<T>(T entity) where T : BaseEntity
        {
            pokemonDbContext.ChangeTracker.LazyLoadingEnabled = true;
            pokemonDbContext.Entry(entity).State = EntityState.Added;
            await pokemonDbContext.Set<T>().AddAsync(entity);
            await pokemonDbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<T> AddByLoadingReferenceAsync<T>(T entity, params Expression<Func<T, object>>[] loadProperties) where T : BaseEntity
        {
            pokemonDbContext.Entry(entity).State = EntityState.Added;
            foreach (var loadProperty in loadProperties)
                await pokemonDbContext.Entry(entity).Reference(loadProperty!).LoadAsync();

            await pokemonDbContext.Set<T>().AddAsync(entity);
            await pokemonDbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<T> AddByLoadingCollectionAsync<T>(T entity, params Expression<Func<T, IEnumerable<object>>>[] loadProperties) where T : BaseEntity
        {
            pokemonDbContext.Entry(entity).State = EntityState.Added;
            foreach (var loadProperty in loadProperties)
                await pokemonDbContext.Entry(entity).Collection(loadProperty).LoadAsync();

            await pokemonDbContext.Set<T>().AddAsync(entity);
            await pokemonDbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<T> UpdateAsync<T>(T entity) where T : BaseEntity
        {
            pokemonDbContext.Entry(entity).State = EntityState.Modified;
            await pokemonDbContext.SaveChangesAsync();
            return await Task.FromResult(entity);
        }

        public async Task<T> UpdateByLoadingReferenceAsync<T>(T entity, params Expression<Func<T, object>>[] loadProperties) where T : BaseEntity
        {
            pokemonDbContext.Entry(entity).State = EntityState.Modified;
            foreach (var loadProperty in loadProperties)
                await pokemonDbContext.Entry(entity).Reference(loadProperty!).LoadAsync();

            await pokemonDbContext.SaveChangesAsync();
            return await Task.FromResult(entity);
        }

        public async Task DeleteAsync<T>(T entity) where T : BaseEntity
        {
            pokemonDbContext.Set<T>().Remove(entity);
            await pokemonDbContext.SaveChangesAsync();
        }

        private IQueryable<T> ApplySpecification<T>(ISpecification<T> spec) where T : BaseEntity
        {
            return SpecificationEvaluator<T>.GetQuery(pokemonDbContext.Set<T>().AsNoTracking(), spec);
        }

        public async Task BeginTransaction()
        {
            pokemonDbContext.BeginTransaction();
            await Task.CompletedTask;
        }

        public async Task CompleteTransaction()
        {
            pokemonDbContext.Commit();
            await Task.CompletedTask;

        }
        public async Task RollbackTransaction()
        {
            pokemonDbContext.Rollback();
            await Task.CompletedTask;

        }
    }
}

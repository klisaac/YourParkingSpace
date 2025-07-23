using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Pokemon.Core.Entities.PokemonDb;

namespace Pokemon.Infrastructure.Data
{
    public sealed class PokemonDbContext : DbContext
    {
        private IDbContextTransaction _transaction;

        public DbSet<AbilityInfoDbEntity> AbilityInfos { get; set; }
        public DbSet<NamedApiResourceDbEntity> NamedApiResources { get; set; }
        public DbSet<SpriteDbEntity> Sprites { get; set; }
        public DbSet<TypeInfoDbEntity> TypeInfos { get; set; }
        public DbSet<UserDbEntity> Users { get; set; }

        public PokemonDbContext()
        {
            ChangeTracker.LazyLoadingEnabled = false;
        }

        public PokemonDbContext(DbContextOptions<PokemonDbContext> options)
            : base(options)
        {
            ChangeTracker.LazyLoadingEnabled = false;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NamedApiResourceDbEntity>(PokemonModelBuilder.ConfigureNamedApiResource);
            modelBuilder.Entity<SpriteDbEntity>(PokemonModelBuilder.ConfigureSprite);
            modelBuilder.Entity<AbilityInfoDbEntity>(PokemonModelBuilder.ConfigureAbilityInfo);
            modelBuilder.Entity<TypeInfoDbEntity>(PokemonModelBuilder.ConfigureTypeInfo);
            modelBuilder.Entity<PokemonDbEntity>(PokemonModelBuilder.ConfigurePokemon);
            modelBuilder.Entity<UserDbEntity>(PokemonModelBuilder.ConfigureUser);
        }

        public void BeginTransaction()
        {
            _transaction = Database.BeginTransaction();
        }

        public void Commit()
        {
            SaveChanges();
            _transaction.Commit();
        }

        public void Rollback()
        {
            _transaction.Rollback();
            _transaction.Dispose();
        }
    }
}

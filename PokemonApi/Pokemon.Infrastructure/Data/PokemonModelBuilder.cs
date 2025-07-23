using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pokemon.Core.Entities.PokemonDb;

namespace Pokemon.Infrastructure.Data
{
    public static class PokemonModelBuilder
    {
        public static void ConfigureNamedApiResource(EntityTypeBuilder<NamedApiResourceDbEntity> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("NamedApiResource").HasKey(x => x.Id);
            entityTypeBuilder.Property(x => x.Id).ValueGeneratedOnAdd().UseIdentityColumn();
            entityTypeBuilder.Property(x => x.Name).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.Url).IsRequired().HasColumnType("varchar(500)");
        }
        public static void ConfigureSprite(EntityTypeBuilder<SpriteDbEntity> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("Sprite").HasKey(x => x.Id);
            entityTypeBuilder.Property(x => x.Id).ValueGeneratedOnAdd().UseIdentityColumn();
            entityTypeBuilder.Property(x => x.BackDefault).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.BackFemale).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.BackShiny).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.BackShinyFemale).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.FrontDefault).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.FrontFemale).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.FrontShiny).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.FrontShinyFemale).IsRequired(false).HasColumnType("varchar(200)");
        }
        public static void ConfigureAbilityInfo(EntityTypeBuilder<AbilityInfoDbEntity> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("AbilityInfo").HasKey(x => x.Id);
            entityTypeBuilder.Property(x => x.Id).ValueGeneratedOnAdd().UseIdentityColumn();
            entityTypeBuilder.Property(x => x.IsHidden).IsRequired(false);
            entityTypeBuilder.Property(x => x.Slot).IsRequired(false);
            entityTypeBuilder.Property(x => x.NamedApiResourceId).IsRequired(false);
            entityTypeBuilder.HasOne(x => x.NamedApiResource).WithMany().OnDelete(DeleteBehavior.Restrict);
            entityTypeBuilder.HasOne(x => x.NamedApiResource).WithMany().OnDelete(DeleteBehavior.Restrict);
        }

        public static void ConfigureTypeInfo(EntityTypeBuilder<TypeInfoDbEntity> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("TypeInfo").HasKey(x => x.Id);
            entityTypeBuilder.Property(x => x.Id).ValueGeneratedOnAdd().UseIdentityColumn();
            entityTypeBuilder.Property(x => x.Slot).IsRequired(false);
            entityTypeBuilder.Property(x => x.NamedApiResourceId).IsRequired(false);
            entityTypeBuilder.HasOne(x => x.NamedApiResource).WithMany().OnDelete(DeleteBehavior.Restrict);
        }

        public static void ConfigurePokemon(EntityTypeBuilder<PokemonDbEntity> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("Pokemon").HasKey(x => x.Id);
            entityTypeBuilder.Property(x => x.Id).ValueGeneratedOnAdd().UseIdentityColumn();
            entityTypeBuilder.Property(x => x.PokemonNumber).IsRequired();
            entityTypeBuilder.Property(x => x.Name).IsRequired(false).HasColumnType("varchar(200)");
            entityTypeBuilder.Property(x => x.Height).IsRequired(false);
            entityTypeBuilder.Property(x => x.Weight).IsRequired(false);
            entityTypeBuilder.Property(x => x.SpriteId).IsRequired(false).HasColumnType("int");
            entityTypeBuilder.HasOne(x => x.Sprites).WithMany().OnDelete(DeleteBehavior.Restrict);
        }

        public static void ConfigureUser(EntityTypeBuilder<UserDbEntity> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("User").Property(u => u.Id).ValueGeneratedOnAdd().UseIdentityColumn();
            entityTypeBuilder.HasKey(u => u.Id);
            entityTypeBuilder.Property(u => u.UserName).IsRequired().HasColumnType("varchar(100)");
            entityTypeBuilder.HasIndex(u => u.UserName).IsUnique();
            entityTypeBuilder.Property(u => u.PasswordHash).HasColumnType("BLOB").IsRequired();
            entityTypeBuilder.Property(u => u.PasswordSalt).HasColumnType("BLOB").IsRequired();
        }

    }
}

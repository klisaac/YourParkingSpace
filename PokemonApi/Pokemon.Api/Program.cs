using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Pokemon.Api.Extensions;
using Pokemon.Api.Middlewares;
using Pokemon.Application.Handlers;
using Pokemon.Core.Configuration;
using Pokemon.Core.Entities.PokemonDb;
using Pokemon.Core.Helpers;
using Pokemon.Core.Logging;
using Pokemon.Core.Repositories.PokemonDb;
using Pokemon.Core.Repositories.PokemonExternalApi;
using Pokemon.Infrastructure.Data;
using Pokemon.Infrastructure.Logging;
using Pokemon.Infrastructure.Repositories.PokemonDb;
using Pokemon.Infrastructure.Repositories.PokemonExternalApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCustomMvc();
builder.Services.AddCustomConfiguration();

builder.Services.AddControllers();
builder.Services.AddCustomSwagger();
builder.Services.AddCustomAuthentication(builder.Configuration);
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped(typeof(IPokemonLogger<>), typeof(PokemonLogger<>));
builder.Services.AddScoped<IBaseRepository, BaseRepository>();
builder.Services.AddScoped<IPokemonRepository, PokemonRepository>();
builder.Services.AddScoped<IPokemonApiRepository, PokemonApiRepository>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(LoginUserQueryHandler).GetTypeInfo().Assembly));

builder.Services.AddHttpClient();
builder.Services.Configure<PokemonApiSettings>(builder.Configuration.GetSection(nameof(PokemonApiSettings)));
builder.Services.AddDbContext<PokemonDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("PokemonConnectionString")!.Replace("WORKING_DIRECTORY_PLACEHOLDER", Directory.GetCurrentDirectory())));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseCustomExceptionMiddleware();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseCustomSwagger();
app.UseHttpsRedirection();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PokemonDbContext>();
    db.Database.Migrate(); // 🚀 This applies pending migrations

    var repository = scope.ServiceProvider.GetRequiredService<IBaseRepository>();
    var user = await repository.GetAll<UserDbEntity>().FirstOrDefaultAsync(x => x.UserName == "pokemon@yps.com");
    if (user == null)
    {
        var (hash, salt) = PasswordHelper.CreatePasswordHash("pokemon");
        var newUser = new UserDbEntity() { UserName = "pokemon@yps.com", PasswordHash = hash, PasswordSalt = salt };
        await repository.AddAsync(newUser);
    }
}

app.Run();

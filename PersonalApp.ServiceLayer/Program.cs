using Microsoft.EntityFrameworkCore;

namespace PersonalApp.ServiceLayer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            // Configure CORS policy to allow requests from any origin (localhost, Vercel, etc.)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddSwaggerGen();
            builder.Services.AddOpenApi();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            // Smart Database Provider: uses PostgreSQL for Neon/Cloud, SQL Server for Localhost
            builder.Services.AddDbContext<PersonalApp.DataAccessLayer.Data.PersonalDashboardDbContext>(options =>
            {
                if (!string.IsNullOrEmpty(connectionString) &&
                   (connectionString.StartsWith("Host=") || connectionString.StartsWith("Server=") && connectionString.Contains("neon.tech") || connectionString.StartsWith("postgres://") || connectionString.StartsWith("postgresql://") || connectionString.Contains("neon.tech")))
                {
                    options.UseNpgsql(connectionString);
                }
                else
                {
                    options.UseSqlServer(connectionString);
                }
            });

            builder.Services.AddScoped<PersonalApp.DataAccessLayer.Repository>();
            builder.Services.AddScoped<PersonalApp.DataAccessLayer.JobRepository>();

            var app = builder.Build();

            // 1. Put CORS first
            app.UseCors("AllowAngular");

            // 2. Enable Swagger
            app.MapOpenApi();
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}

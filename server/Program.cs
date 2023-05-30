// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Stripe;
using Stripe.Checkout;


WebHost.CreateDefaultBuilder(args)
              .UseUrls("http://0.0.0.0:4242")
              .UseWebRoot("public")
              .UseStartup<Startup>()
              .Build()
              .Run();


public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors();
        services.AddMvc().AddNewtonsoftJson();
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // This is your test secret API key.
        StripeConfiguration.ApiKey = "YOUR_STRIPE_SECRET_KEY";
        if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
        app.UseRouting();
        app.UseStaticFiles();
        //allow localhost:4200 to connect to this api
        app.UseCors(options => options.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
        // app.UseCors(options => options.SetIsOriginAllowed(origin => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
        app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
}

[Route("create-checkout-session")]
[ApiController]
public class CheckoutApiController : Controller
{
    [HttpPost]
    public async Task<ActionResult> Create()
    {
        var items = JsonSerializer.Deserialize<Items>(await new StreamReader(HttpContext.Request.Body, Encoding.UTF8).ReadToEndAsync());

        var LineItems = new List<SessionLineItemOptions>();
        foreach (var item in items.items)
        {
            var LineItemsOptions = new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    UnitAmount = item.price,
                    Currency = "usd",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = item.name,
                        Images = new List<string> { item.product },
                    },
                },
                Quantity = item.quantity,
            };
            LineItems.Add(LineItemsOptions);
        }

        var domain = "http://localhost:4200";
        var options = new SessionCreateOptions
        {
            ShippingAddressCollection = new SessionShippingAddressCollectionOptions
            {
                AllowedCountries = new List<string> { "ID", "PH", "MY", "SG", "TH", "VN" },
            },
            ShippingOptions = new List<SessionShippingOptionOptions>
    {
        new SessionShippingOptionOptions
        {
            ShippingRateData = new SessionShippingOptionShippingRateDataOptions
            {
                Type = "fixed_amount",
                FixedAmount = new SessionShippingOptionShippingRateDataFixedAmountOptions
                {
                    Amount = 0,
                    Currency = "usd",
                },
                DisplayName = "Free shipping",
                DeliveryEstimate = new SessionShippingOptionShippingRateDataDeliveryEstimateOptions
                {
                    Minimum = new SessionShippingOptionShippingRateDataDeliveryEstimateMinimumOptions
                    {
                        Unit = "business_day",
                        Value = 5,
                    },
                    Maximum = new SessionShippingOptionShippingRateDataDeliveryEstimateMaximumOptions
                    {
                        Unit = "business_day",
                        Value = 7,
                    },
                },
            },
        },
        new SessionShippingOptionOptions
        {
            ShippingRateData = new SessionShippingOptionShippingRateDataOptions
            {
                Type = "fixed_amount",
                FixedAmount = new SessionShippingOptionShippingRateDataFixedAmountOptions
                {
                    Amount = 1500,
                    Currency = "usd",
                },
                DisplayName = "Next day air",
                DeliveryEstimate = new SessionShippingOptionShippingRateDataDeliveryEstimateOptions
                {
                    Minimum = new SessionShippingOptionShippingRateDataDeliveryEstimateMinimumOptions
                    {
                        Unit = "business_day",
                        Value = 1,
                    },
                    Maximum = new SessionShippingOptionShippingRateDataDeliveryEstimateMaximumOptions
                    {
                        Unit = "business_day",
                        Value = 1,
                    },
                },
            },
        },
    },
            LineItems = LineItems,
            Mode = "payment",
            SuccessUrl = domain + "/homepage/carts/payment-success",
            CancelUrl = domain + "/homepage/carts",
        };
        var service = new SessionService();
        Session session = service.Create(options);

        System.Console.WriteLine(session.Url);
        Response.Headers.Add("Location", session.Url);
        return Ok(session);
    }
}
public class StripeOptions
{
    public string option { get; set; }
}

public class Items
{
    public List<Product> items { get; set; }
}
public class Product
{
    public string product { get; set; }
    public string name { get; set; }
    public int price { get; set; }
    public int quantity { get; set; }
    public string id { get; set; }
}
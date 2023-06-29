# Nest Correlation IDs

This package uses middleware to set a correlation ID for each request using `AsyncLocalStorage`. The correlation ID is then accessible using the `CorrelationIdService.get()` method.

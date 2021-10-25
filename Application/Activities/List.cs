using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> {}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
        private readonly DataContext _context;
        private readonly ILogger _logger;

            public Handler(DataContext context)
            {
                _context = context;
            }

            async public Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // This is for cancelling the request whenever a browser is closed, etc.
                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
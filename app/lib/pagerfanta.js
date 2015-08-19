exports.setPagerfanta = function(response) {
    var pagerfanta = {
        page : null,
        self : null,
        first : null,
        last : null,
        next : null,
        previous : null
    };

    Ti.API.error('response:', response);

    try {
        response = JSON.parse(response);

        Ti.API.error('response:', response);

        if (response && response._links) {
            if (response.page) {
                pagerfanta.page = response.page;
            }

            if (response._links.self && response._links.self.href) {
                pagerfanta.self = response._links.self.href;
            }

            if (response._links.first && response._links.first.href) {
                pagerfanta.first = response._links.first.href;
            }

            if (response._links.last && response._links.last.href) {
                pagerfanta.last = response._links.last.href;
            }

            if (response._links.next && response._links.next.href) {
                pagerfanta.next = response._links.next.href;
            }

            if (response._links.previous && response._links.previous.href) {
                pagerfanta.previous = response._links.previous.href;
            }
        }
    } catch (e) {
    }

    Ti.API.error('pagerfanta:', pagerfanta);

    return {
        pagerfanta : pagerfanta
    };
};

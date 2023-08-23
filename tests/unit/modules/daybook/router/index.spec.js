import daybookRouter from "@/modules/daybook/router";

describe("Daybook Router", () => {
  test("The router should have the configuration set", async () => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "non-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    // expect( (await daybookRouter.children[0].component()).default.name  ).toBe('NonEntrySelected')
    // expect( (await daybookRouter.children[1].component()).default.name  ).toBe('EntryView')

    const promiseRoutes = [];
    daybookRouter.children.forEach((child) =>
      promiseRoutes.push(child.component())
    );

    const routes = (await Promise.all(promiseRoutes)).map(
      (route) => route.default.name
    );

    expect(routes).toContain("EntryView");
    expect(routes).toContain("NonEntrySelected");
  });

  test("Should return the id of the route", () => {
    const route = {
      params: {
        id: "ABC-123",
      },
    };

    //El problema de manejar los children como un array y su índice, es que si se modifica el mapa de rutas original, esta prueba fallará. Entonces es mejor buscarla por filtrado del name sin importar el orden
    // expect( daybookRouter.children[1].props( route ) ).toEqual({ id: 'ABC-123' })

    const entryRoute = daybookRouter.children.find(
      (route) => route.name === "entry"
    );

    expect(entryRoute.props(route)).toEqual({ id: "ABC-123" });
  });
});

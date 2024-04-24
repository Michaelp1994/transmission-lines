import { faker } from "@faker-js/faker";
import { describe, expect, test, vi } from "vitest";

import DataWrapper from "./DataWrapper";

import { render } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

describe("Data Wrapper", () => {
    test("renders", () => {
        const projectId = faker.string.uuid();
        const mockFn = vi.fn();
        render(
            <MockTrpcProvider mockFn={mockFn}>
                <DataWrapper projectId={projectId} />
            </MockTrpcProvider>
        );
        expect(mockFn).toBeCalledWith({ projectId });
    });
});

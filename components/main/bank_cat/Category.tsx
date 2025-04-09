import Image from "next/image";
import Link from "next/link";

export default function Category() {
  return (
    <section className="w-full py-6 relative px-5 md:px-0">
      {" "}
      <div className="absolute top-0 left-0 /pacity-10 w-full -z-10 h-full">
        <Image
          src="/assets/gridlines.svg"
          alt=""
          width={1000}
          height={1000}
          className="h-full/  w-80 h-80 opacity-15  parallax-image  /object-cover"
        />
      </div>
      <div className="absolute top-0 right-10 /pacity-10 w-full -z-10 h-full">
        <Image
          src="/assets/gridlines.svg"
          alt=""
          width={1000}
          height={1000}
          className="h-full/  w-80 h-80 opacity-15  parallax-image  /object-cover"
        />
      </div>
      <div className="container px-4 md:px-20 z-0">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row item-center md:justify-between relative  w-full md:gap-10 gap-5 pb-8 /px-14">
            <div className="text-4xl font-semibold z-20 text-neutral-700 ">
              <span className="text-base-color/70">Built</span> for <br />{" "}
              Businesses
            </div>
            <div className="text-wrap font-medium md:text-base /text-center md:px-5 text-sm text-neutral-500">
              Swift Nexus is designed with the diverse <br /> needs of
              businesses in mind, from burgeoning <br /> startups to established
              enterprises.
            </div>{" "}
            <div className="md:flex hidden">
              {" "}
              <Link
                href="#"
                className="flex bg-base-color/80 h-12 py-2 items-center justify-center gap-x-2 text-nowrap rounded-full px-8 text-sm /font-medium font-bold text-neutral-50 shadow transition-colors hover:bg-base-color/60 "
              >
                <p>{"Create an account"}</p>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 pb-10 z-30">
            <div className="rounded-md overflow-hidden /border /border-gray-200 bg-neutral-50/50">
              <div className="space-y-4">
                {" "}
                <Image
                  src={"/assets/smallbusinesses.png"}
                  width={400}
                  height={250}
                  alt="Small Business"
                  className=" object-cover h-60 overflow-hidden w-full"
                />{" "}
                <div className="inline-block rounded-md bg-blue-50 mx-6 text-blue-500 font-medium px-3 py-2 text-xs ">
                  <BriefcaseIcon className="w-4 h-4 mr-2 inline-block " />
                  Small Businesses
                </div>
                <h3 className="text- font-bold px-6">
                  Tailored for Your Growth
                </h3>
                <p className="text-gray-500 text-sm font-medium xt-gray-400 px-6 pb-4">
                  Our specialized banking services are designed to support small
                  businesses like yours, helping you manage your finances and
                  achieve your goals.
                </p>
                <div className="flex px-6 pb-6">
                  {" "}
                  <Link
                    href="/auth/login"
                    className="flex h-12 text-neutral-600 bg-neutral-100 items-center justify-center gap-x-2 text-nowrap rounded-full px-8 text-sm /font-medium font-bold "
                  >
                    <p>{"Open an account"}</p>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-md overflow-hidden /border /border-gray-200 bg-neutral-50/50">
              <div className="space-y-4">
                <Image
                  src={"/assets/bigbusinesses.png"}
                  width={400}
                  height={300}
                  alt="Large Enterprise"
                  className="rou/nded-lg object-cover w-full h-60 overflow-hidden"
                />{" "}
                <div className="inline-block rounded-md font-medium mx-6 text-green-500 bg-green-50 px-3 py-2 text-xs /:bg-gray-800">
                  <BuildingIcon className="w-4 h-4 mr-2 inline-block text-sm" />
                  Large Enterprises
                </div>{" "}
                <h3 className="text- font-bold px-6">Powering Your Growth</h3>
                <p className="text-gray-500 text-sm font-medium /:text-gray-400 px-6 pb-4">
                  Our comprehensive banking solutions are tailored to meet the
                  complex needs of large enterprises, helping you manage your
                  finances and drive your business forward.
                </p>
                <div className="flex px-6 pb-6">
                  {" "}
                  <Link
                    href="#"
                    className="flex h-12 text-neutral-600 bg-neutral-100 items-center justify-center gap-x-2 text-nowrap rounded-full px-8 text-sm /font-medium font-bold "
                  >
                    <p>{"Open an account"}</p>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-md overflow-hidden /border /border-gray-200 bg-neutral-50/50">
              <div className="space-y-4">
                <Image
                  src={"/assets/sstartups.png"}
                  width={1000}
                  height={1000}
                  alt="Startup"
                  className=" object-cover w-full h-60 overflow-hidden"
                />{" "}
                <div className="inline-block rounded-md mx-6 font-medium bg-red-50 text-red-500 px-3 py-2 text-xs /:bg-gray-800">
                  <RocketIcon className="w-4 h-4 mr-2 inline-block text-sm" />
                  Startups
                </div>{" "}
                <h3 className="text font-bold px-6">Fueling Your Innovation</h3>
                <p className="text-gray-500 text-sm font-medium /:text-gray-400 px-6 pb-4">
                  Our specialized banking services are designed to support
                  startups like yours, providing the financial tools and
                  expertise you need to turn your ideas into reality.
                </p>
                <div className="flex px-6 pb-6">
                  {" "}
                  <Link
                    href="/auth/login"
                    className="flex h-12 text-neutral-600 bg-neutral-100 items-center justify-center gap-x-2 text-nowrap rounded-full px-8 text-sm /font-medium font-bold "
                  >
                    <p>{"Open an account"}</p>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function BuildingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function RocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

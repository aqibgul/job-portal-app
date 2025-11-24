import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, User } from "lucide-react";
import { string } from "zod";
const StateCard = ({ username = string, email = string }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div>
          <Card className="bg-blue-100">
            <CardHeader>
              <CardTitle>589</CardTitle>
              <CardDescription>open jobs</CardDescription>
              <CardAction>
                <Briefcase className="bg-blue-300 p-1" />
              </CardAction>
            </CardHeader>
          </Card>
        </div>
        <div>
          <Card className="bg-orange-100">
            <CardHeader>
              <CardTitle>2250</CardTitle>
              <CardDescription>Saved Candidates</CardDescription>
              <CardAction>
                <User className="bg-orange-300 p-1" />
              </CardAction>
            </CardHeader>
          </Card>
        </div>
        <div />
      </div>
    </>
  );
};
export default StateCard;
